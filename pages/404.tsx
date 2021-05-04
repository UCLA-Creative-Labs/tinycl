import {useEffect} from 'react';
import {useRouter} from 'next/router';

export default function Custom404(): JSX.Element {
  const router = useRouter();
  useEffect(() => void router.replace('/'));
  return null;
}