import config from './config';
import fakerService from './services/fakerService';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

console.error('Starting Mocker MCP server...');
console.error(`Using Faker API base URL: ${config.fakerApiBaseUrl}`);

// Create an MCP server
const server = new McpServer({
  name: 'mocker-faker-api',
  version: '1.0.0'
});

// Register tools for the Faker API endpoints
server.tool(
  'getPersons',
  {
    quantity: z.number().default(1)
  },
  async (args) => {
    try {
      const data = await fakerService.getPersons(args.quantity);
      return {
        content: [{ type: 'text', text: JSON.stringify(data, null, 2) }]
      };
    } catch (error) {
      return {
        content: [{ type: 'text', text: `Error fetching persons: ${error instanceof Error ? error.message : String(error)}` }]
      };
    }
  }
);

server.tool(
  'getProducts',
  {
    quantity: z.number().default(1)
  },
  async (args) => {
    try {
      const data = await fakerService.getProducts(args.quantity);
      return {
        content: [{ type: 'text', text: JSON.stringify(data, null, 2) }]
      };
    } catch (error) {
      return {
        content: [{ type: 'text', text: `Error fetching products: ${error instanceof Error ? error.message : String(error)}` }]
      };
    }
  }
);

server.tool(
  'getTexts',
  { 
    quantity: z.number().default(1),
    characters: z.number().default(500)
  },
  async (args) => {
    try {
      const data = await fakerService.getTexts(args.quantity, args.characters);
      return {
        content: [{ type: 'text', text: JSON.stringify(data, null, 2) }]
      };
    } catch (error) {
      return {
        content: [{ type: 'text', text: `Error fetching texts: ${error instanceof Error ? error.message : String(error)}` }]
      };
    }
  }
);

server.tool(
  'getAddresses',
  {
    quantity: z.number().default(1)
  },
  async (args) => {
    try {
      const data = await fakerService.getAddresses(args.quantity);
      return {
        content: [{ type: 'text', text: JSON.stringify(data, null, 2) }]
      };
    } catch (error) {
      return {
        content: [{ type: 'text', text: `Error fetching addresses: ${error instanceof Error ? error.message : String(error)}` }]
      };
    }
  }
);

server.tool(
  'getCompanies',
  {
    quantity: z.number().default(1)
  },
  async (args) => {
    try {
      const data = await fakerService.getCompanies(args.quantity);
      return {
        content: [{ type: 'text', text: JSON.stringify(data, null, 2) }]
      };
    } catch (error) {
      return {
        content: [{ type: 'text', text: `Error fetching companies: ${error instanceof Error ? error.message : String(error)}` }]
      };
    }
  }
);

// Info about available tools will be logged to stderr
console.error(`
Mocker Faker API Tools:
- getPersons(quantity: number) - Get random person data
- getProducts(quantity: number) - Get random product data
- getTexts(quantity: number, characters: number) - Get random text data
- getAddresses(quantity: number) - Get random address data
- getCompanies(quantity: number) - Get random company data
`);

// Connect using stdio transport
const transport = new StdioServerTransport();

// Start the server
server.connect(transport)
  .then(() => {
    console.error('Mocker MCP server ready');
  })
  .catch((error: unknown) => {
    console.error('Error starting MCP server:', error);
    process.exit(1);
  });

// Handle termination
process.on('SIGINT', () => {
  console.error('Shutting down MCP server');
  process.exit(0);
}); 