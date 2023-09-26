type Props = {
  statusCode: any;
};

const Error = ({ statusCode }: Props) => {
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : 'An error occurred on client'}
    </p>
  );
};

type InitialProps = {
  res: any;
  err: any;
};

Error.getInitialProps = ({ res, err }: InitialProps) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
