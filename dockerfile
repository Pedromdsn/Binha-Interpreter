FROM oven/bun:1.0

WORKDIR /app

COPY . .

RUN bun install
RUN bun run build


CMD ["bun", "run", "start"]
