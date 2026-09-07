import { emails } from '../data/emails.js';

export function buscarEmails(req, res) {
    res.json(emails);
}