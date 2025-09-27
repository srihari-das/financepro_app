import { Mastra } from '@mastra/core/mastra';
import { chatWorkflow } from './workflows/chatWorkflow';
import { apiRoutes } from './apiRegistry';
import { financialLiteracyAgent } from './agents/financialLiteracyAgent';
import { storage } from './memory';

/**
 * Main Mastra configuration
 *
 * This is where you configure your agents, workflows, storage, and other settings.
 * The starter template includes:
 * - A basic agent that can be customized
 * - A chat workflow for handling conversations
 * - In-memory storage (replace with your preferred database)
 * - API routes for the frontend to communicate with
 */

export const mastra = new Mastra({
  agents: { financialLiteracyAgent },
  workflows: { chatWorkflow },
  storage,
  telemetry: {
    enabled: true,
  },
  server: {
    apiRoutes,
  },
});
