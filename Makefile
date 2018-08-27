GOOGLE_API_KEY = AIzaSyChNlerDt3cxNWvSylVdCsUkJ-3l87qojU
BACKEND_URL = http://localhost:3000
APP = askizzy-frontend
REPO = registry.gitlab.com/ferdinand-swoboda/$(APP)
VERSION_TAG := $(shell git describe)

FLAGS := -e GOOGLE_API_KEY="$(GOOGLE_API_KEY)" \
	-e ISS_URL="$(BACKEND_URL)" \
	-e SELENIUM_BROWSER="phantomjs" \
	-e ENVIRONMENT="staging"

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

serve:
	docker run -t -p 8000:8000 $(FLAGS) -- $(REPO):$(VERSION_TAG) serve

.PHONY: build lint unit-test feature-test maps-test personalisation-test search-test serve
