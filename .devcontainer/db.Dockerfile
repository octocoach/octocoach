FROM postgres:15-bookworm

RUN apt-get update \
        && export DEBIAN_FRONTEND=noninteractive \
        && apt-get -y install --no-install-recommends postgresql-15-pgvector