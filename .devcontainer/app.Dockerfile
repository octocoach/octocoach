FROM mcr.microsoft.com/devcontainers/javascript-node:1-20-bookworm

# [Optional] Uncomment this section to install additional OS packages.
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends gnupg2 xvfb xauth ffmpeg

# RUN pip install pgcli
# [Optional] Uncomment if you want to install an additional version of node using nvm
# ARG EXTRA_NODE_VERSION=10
# RUN su node -c "source /usr/local/share/nvm/nvm.sh && nvm install ${EXTRA_NODE_VERSION}"

# [Optional] Uncomment if you want to install more global node modules

RUN npm install pnpm -g

RUN mkdir -p /.pnpm-store && chown node:node /.pnpm-store

RUN su node -c "npx playwright install --with-deps chromium"
