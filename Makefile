APP = askizzy-frontend
REGISTRY = registry.gitlab.com/ferdinand-swoboda
VERSION_TAG := $(shell git describe)
export CONTAINER_IMAGE = $(REGISTRY)/$(APP):${VERSION_TAG}
export GOOGLE_API_KEY = AIzaSyChNlerDt3cxNWvSylVdCsUkJ-3l87qojU

# backend variables
export BACKEND_IMAGE ?= $(REGISTRY)/askizzy-backend:vAS-1.1.1
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
	docker run -t -e GOOGLE_API_KEY="$(GOOGLE_API_KEY)" -e SELENIUM_BROWSER="phantomjs" -- $(CONTAINER_IMAGE) unit-test

feature-test:
	export COMMAND=feature-test && docker-compose up --abort-on-container-exit

maps-test:
	docker run -t $(FLAGS) -- $(CONTAINER_IMAGE) maps-test

personalisation-test:
	docker run -t $(FLAGS) -- $(CONTAINER_IMAGE) personalisation-test

search-test:
	docker run -t $(FLAGS) -- $(CONTAINER_IMAGE) search-test

serve:
	docker run -t -p 8000:8000 -e GOOGLE_API_KEY="$(GOOGLE_API_KEY)" -e ISS_URL=0.0.0.0:3000 -- $(CONTAINER_IMAGE) serve

.PHONY: build lint unit-test feature-test maps-test personalisation-test search-test serve
