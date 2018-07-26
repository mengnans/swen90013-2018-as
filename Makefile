CI ?=
GOOGLE_API_KEY = AIzaSyChNlerDt3cxNWvSylVdCsUkJ-3l87qojU
ISS_URL = http://localhost:5000

APP = ask_izzy
REPO = cis.unimelb.edu.au/$(APP)
VERSION_TAG := $(shell git describe)

# Allow multi-line assignments to include a `\` on the end of every
# line (including the last one), which avoids the situation where you
# have to touch two lines in order to add an item to the list.
NULL=

FLAGS := -e CI="$(CI)" \
	-e GOOGLE_API_KEY="$(GOOGLE_API_KEY)" \
	-e ISS_URL="$(ISS_URL)" \
	-e SELENIUM_BROWSER="phantomjs" \
	-e ENVIRONMENT="staging" \
	$(NULL)

build:
	@test -z "`git status --porcelain`" || echo "WARNING: you have changes to your git repo not committed to this tag"
	docker build -t $(REPO):$(VERSION_TAG) .;
	@echo "Successfully built $(REPO):$(VERSION_TAG)..."

lint:
	docker run -t $(FLAGS) -- $(REPO):$(VERSION_TAG) lint

unit-test:
	docker run -t $(FLAGS) -- $(REPO):$(VERSION_TAG) unit-test

feature-test:
	docker run -t $(FLAGS) -- $(REPO):$(VERSION_TAG) feature-test

maps-test:
	docker run -t $(FLAGS) -- $(REPO):$(VERSION_TAG) maps-test

personalisation-test:
	docker run -t $(FLAGS) -- $(REPO):$(VERSION_TAG) personalisation-test

search-test:
	docker run -t $(FLAGS) -- $(REPO):$(VERSION_TAG) search-test

deploy:
	docker run -t $(FLAGS) -- $(REPO):$(VERSION_TAG) deploy

serve:
	docker run -Pt $(FLAGS) -- $(REPO):$(VERSION_TAG) serve

.PHONY: build lint unit-test feature-test maps-test personalisation-test search-test deploy serve
