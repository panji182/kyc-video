import dynamic from 'next/dynamic';

const ErrorLayout = dynamic(
  () => import('@/components/template/Layouts/ErrorLayout')
);

export default function Custom500() {
  return (
    <ErrorLayout errorCode="500" errorDescription="Internal Server Error !" />
  );
}
