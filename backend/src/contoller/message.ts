import { Request, Response } from 'express';
import contextTable from '../constant';
const noContextFound = 'Sorry, I don’t understand.';

export const postMessage = async (req: Request, res: Response) => {
  const { conversation_id, message } = req.body;
  try {
    let messageResponse = '';
    const contextFound = contextTable.some(
      ({ stringToSearch, message: messageContext }) =>
        stringToSearch.some((string) => {
          const matchFound = message.includes(string);
          matchFound && (messageResponse = messageContext);
          return matchFound;
        }),
    );
    if (contextFound) {
      return res.json({
        response_id: conversation_id,
        message: messageResponse,
      });
    }
    throw new Error(noContextFound);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
