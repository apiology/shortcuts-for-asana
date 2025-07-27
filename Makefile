.PHONY: build build-typecheck bundle_install cicoverage citypecheck citest citypecoverage clean clean-coverage clean-typecheck clean-typecoverage coverage default gem_dependencies help overcommit quality repl report-coverage report-coverage-to-codecov test typecheck typecoverage update_from_cookiecutter
.DEFAULT_GOAL := default

define PRINT_HELP_PYSCRIPT
import re, sys

for line in sys.stdin:
	match = re.match(r'^([a-zA-Z_-]+):.*?## (.*)$$', line)
	if match:
		target, help = match.groups()
		print("%-20s %s" % (target, help))
endef
export PRINT_HELP_PYSCRIPT

help:
	@python -c "$$PRINT_HELP_PYSCRIPT" < $(MAKEFILE_LIST)

default: clean-typecoverage build typecheck typecoverage package clean-coverage test coverage overcommit_branch quality ## run default typechecking, tests and quality

SOURCE_FILE_GLOBS = ['{src}/**/*.ts']

SOURCE_FILES := $(shell ruby -e "puts Dir.glob($(SOURCE_FILE_GLOBS))")

chrome-extension-start: ## run webpack continuously and watch files
	npm run chrome-extension-start

start: chrome-extension-start ## run server continously and watch files for changes
	echo "Teach me how to 'make start'"
	exit 1

webpack: ## run webpack and tie together modules for use by browser
	npx webpack

build-chrome-extension: yarn.lock webpack

build: bundle_install yarn_install pip_install build-typecheck build-chrome-extension  ## Update 3rd party packages as well and produce any artifacts needed from code

package: package-chrome-extension

package-chrome-extension: build-chrome-extension
	cd dist/chrome-extension && zip -r ../../package.zip .

types.installed: Gemfile.lock Gemfile.lock.installed ## Ensure typechecking dependencies are in place
	touch types.installed

build-typecheck: types.installed  ## Fetch information that type checking depends on

clean-typecheck: ## Refresh the easily-regenerated information that type checking depends on
	rm -f types.installed
	echo all clear

realclean-typecheck: clean-typecheck ## Remove all type checking artifacts

realclean: clean realclean-typecheck
	rm -fr vendor/bundle .bundle
	rm -f .make/*
	rm -f *.installed
	rm -fr node_modules

typecheck: build-typecheck webpack ## validate types in code and configuration
	jsonschema --instance static/chrome-extension/manifest.json docs/chrome-manifest-v3-schema.json

citypecheck: typecheck ## Run type check from CircleCI

typecoverage: typecheck ## Run type checking and then ratchet coverage in metrics/

clean-typecoverage: ## Clean out type-related coverage previous results to avoid flaky results

citypecoverage: typecoverage ## Run type checking, ratchet coverage, and then complain if ratchet needs to be committed

config/env: config/env.1p  ## Create file suitable for docker-compose usage
	cat config/env.1p | cut -d= -f1 > config/env

requirements_dev.txt.installed: requirements_dev.txt
	pip install -q --disable-pip-version-check -r requirements_dev.txt
	touch requirements_dev.txt.installed

pip_install: requirements_dev.txt.installed ## Install Python dependencies

Gemfile.lock: Gemfile
	make .bundle/config
	bundle lock

yarn_install: yarn.lock.installed

yarn.lock.installed: package.json node_modules/.keep
	touch yarn.lock.installed

yarn.lock: package.json
	# --prefer-offline: maximize use of yarn cache for speed
	# --no-progress: progress bar creates artifacts in M-x shell
	# --non-interactive: don't interrupt CI with a prompt
	yarn install --prefer-offline --no-progress --non-interactive
	touch node_modules/.keep

.bundle/config:
	touch .bundle/config

gem_dependencies: .bundle/config

# Ensure any Gemfile.lock changes, even pulled from git, ensure a
# bundle is installed.
Gemfile.lock.installed: Gemfile vendor/.keep
	touch Gemfile.lock.installed

vendor/.keep: Gemfile.lock .ruby-version
	make gem_dependencies
	bundle install
	touch vendor/.keep

node_modules/.keep: yarn.lock
	# --prefer-offline: maximize use of yarn cache for speed
	# --no-progress: progress bar creates artifacts in M-x shell
	# --non-interactive: don't interrupt CI with a prompt
	yarn install --prefer-offline --no-progress --non-interactive
	touch node_modules/.keep

bundle_install: Gemfile.lock.installed ## Install Ruby dependencies

clean: clean-typecoverage clean-typecheck clean-coverage ## remove all built artifacts
	rm -fr package.zip dist/chrome-extension/* || true

test: ## run tests quickly
	npm test

citest: test ## Run unit tests from CircleCI

overcommit: ## run precommit quality checks
	bin/overcommit --run

overcommit_branch: ## run precommit quality checks only on changed files
	@bin/overcommit_branch

quality: overcommit ## run precommit quality checks

repl: ## Bring up an interactive JavaScript prompt
	node

clean-coverage: ## Clean out previous output of test coverage to avoid flaky results from previous runs

coverage: test report-coverage ## check code coverage

report-coverage: test ## Report summary of coverage to stdout, and generate HTML, XML coverage report

report-coverage-to-codecov: report-coverage ## use codecov.io for PR-scoped code coverage reports
	@curl -Os https://uploader.codecov.io/latest/linux/codecov
	@chmod +x codecov
	@./codecov --file coverage/lcov.info --nonZero

update_apt: .make/apt_updated

.make/apt_updated:
	sudo DEBIAN_FRONTEND=noninteractive apt-get update -y
	touch .make/apt_updated

cicoverage: citest report-coverage-to-codecov ## check code coverage

update_from_cookiecutter: ## Bring in changes from template project used to create this repo
	bin/overcommit --uninstall
	cookiecutter_project_upgrader --help >/dev/null
	IN_COOKIECUTTER_PROJECT_UPGRADER=1 cookiecutter_project_upgrader || true
	git checkout cookiecutter-template && git push --no-verify
	git checkout main; overcommit --sign && overcommit --sign pre-commit && overcommit --sign pre-push && git checkout main && git pull && git checkout -b update-from-cookiecutter-$$(date +%Y-%m-%d-%H%M)
	git merge cookiecutter-template || true
	git checkout --ours Gemfile.lock yarn.lock || true
	# update frequently security-flagged gems while we're here
	bundle update --conservative json rexml || true
	( make build && git add Gemfile.lock yarn.lock ) || true
	bin/overcommit --install || true
	@echo
	@echo "Please resolve any merge conflicts below and push up a PR with:"
	@echo
	@echo '   gh pr create --title "Update from cookiecutter" --body "Automated PR to update from cookiecutter boilerplate"'
	@echo
	@echo
