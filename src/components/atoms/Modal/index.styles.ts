import { toRem } from "@/helpers/globalFunctions";

const styles = {
  style : {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #dedede',
    boxShadow: 24,
    borderRadius: '10px',
    padding: toRem(32)
  }
};

export default styles;