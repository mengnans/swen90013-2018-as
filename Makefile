APP = askizzy-frontend
REGISTRY = registry.gitlab.com/ferdinand-swoboda
VERSION_TAG := $(shell git describe)
export CONTAINER_IMAGE = $(REGISTRY)/$(APP):${VERSION_TAG}
export GOOGLE_API_KEY = AIzaSyChNlerDt3cxNWvSylVdCsUkJ-3l87qojU
export ISS_URL = http://0.0.0.0:3000

# backend variables
export BACKEND_IMAGE ?= $(REGISTRY)/askizzy-backend:vAS-1.2.2
export POSTGRES_PASSWORD = example
export POSTGRES_USER = askizzy
export POSTGRES_DB = askizzy

build:
	@test -z "`git status --porcelain`" || echo "WARNING: you have changes to your git repo not committed to this tag"
	docker build -t $(CONTAINER_IMAGE) .;
    @echo "Successfully built $(CONTAINER_IMAGE)..."

lint:
	docker run -t -- $(CONTAINER_IMAGE) lint

unit-test:
	docker run -t -e SELENIUM_BROWSER="phantomjs" -- $(CONTAINER_IMAGE) unit-test

feature-test:
	docker run -t $(FLAGS) -- $(CONTAINER_IMAGE) feature-test

maps-test:
	docker run -t $(FLAGS) -- $(CONTAINER_IMAGE) maps-test

personalisation-test:
	docker run -t $(FLAGS) -- $(CONTAINER_IMAGE) personalisation-test

search-test:
	docker run -t $(FLAGS) -- $(CONTAINER_IMAGE) search-test

serve:
	docker run -t -p 8000:8000 -e ENVIRONMENT=prod -e GOOGLE_API_KEY=${GOOGLE_API_KEY} -e ISS_URL=${ISS_URL} -- $(CONTAINER_IMAGE) serve

.PHONY: build lint unit-test feature-test maps-test personalisation-test search-test serve
