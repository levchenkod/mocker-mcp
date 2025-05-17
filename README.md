# Mocker - FakerAPI MCP Server

A Model Context Protocol (MCP) server that proxies the [FakerAPI](https://fakerapi.it) via the MCP protocol. Gives a predictable random data output

## Getting Started

### Installation

```bash
pnpm install
```

### Configuration

Create a `.env` file in the root directory:

```
PORT=3000
API_BASE_URL=https://fakerapi.it/api/v1
```

### Building

```bash
pnpm build
```

### Running

```bash
pnpm start
```

For development

```bash
pnpm dev
```

## Use with Cursor

### Run server via Docker

#### Build image

```sh
  docker build -t mocker-mcp .
```

#### Run image (optional)

```sh
  docker run --rm -i mocker-mcp
```

### Update `mcp.json`

Go to the Cursor Settings/MCP and click "Add new global MCP server"

```json
{
  "mcpServers": {
    "mocker": {
      "command": "docker",
      "args": ["run", "--rm", "-i", "mocker-mcp"],
    }
  }
}
```

### Restart Cursor

After restart, go to the Cursor Settings/MCP and ensure that the `mocker` server and tools are available.

### Usage

Prompt agent with something like:

```
Get 3 random persons
```

or 

```
Get 3 random companies
```

### Troubleshooting

If `mocker` server shows any errors, go to View/Output and select Cursor MCP

## Usage with MCP Clients

```typescript
import { Client } from "@modelcontextprotocol/sdk/client";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio";

const transport = new StdioClientTransport({
  command: "node",
  args: ["./dist/index.js"],
});

const client = new Client({
  name: "mocker-client",
  version: "1.0.0",
});

await client.connect(transport);

// Get a list of available tools
const tools = await client.listTools();
console.log(tools);

// Call tools
const persons = await client.callTool({
  name: "getPersons",
  arguments: { quantity: 3 },
});
console.log(persons);

// Disconnect
await client.disconnect();
```
