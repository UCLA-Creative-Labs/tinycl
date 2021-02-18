// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../utils/firebase';

let links;

void db.collection('links').get().then(snapshot => {
  links = snapshot.docs.map(doc => doc.data());
});

export default (req: NextApiRequest, res: NextApiResponse): void => {
  const {
    method,
  } = req;
  switch(method) {
    case 'GET':
      res.status(200).json({ links });
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`) ;
  }
};
