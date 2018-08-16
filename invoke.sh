#!/bin/bash

case "$1" in
    lint)
        shift 1

        exec ./script/typecheck
        ;;

    unit-test)
        shift 1

        echo "ISS server: $ISS_URL"
        exec ./script/unit-test
        ;;

    feature-test)
        shift 1

        echo "ISS server: $ISS_URL"
        exec ./script/feature-test
        ;;

    maps-test)
        shift 1

        echo "ISS server: $ISS_URL"
        exec ./script/maps-test
        ;;

    personalisation-test)
        shift 1

        echo "ISS server: $ISS_URL"
        exec ./script/personalisation-test
        ;;


    search-test)
        shift 1

        echo "ISS server: $ISS_URL"
        exec ./script/search-test
        ;;

    serve)
        shift 1

        ./script/build-gmaps-file
        exec ./script/run-nginx
        ;;

    env)
        shift 1
        exec env $@
        ;;

    *)
        echo "Unknown command: $1"
        ;;
esac
