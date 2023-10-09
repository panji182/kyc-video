import dynamic from 'next/dynamic';

const ErrorLayout = dynamic(
  () => import('@/components/template/Layouts/ErrorLayout')
);

export default function Custom404() {
  return <ErrorLayout errorCode="404" errorDescription="Page Not Found !" />;
}
