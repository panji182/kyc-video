import CsvDownloadButton from 'react-json-to-csv';

type Props = {
  id: string;
  data: any[];
  filename?: string;
  delimiter?: ';' | ',';
};

const CsvDownloader = ({ data, ...props }: Props) => {
  return (
    <CsvDownloadButton style={{ display: 'none' }} data={data} {...props} />
  );
};

export default CsvDownloader;
