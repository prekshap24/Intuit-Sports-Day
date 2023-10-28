import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class UtilService {

    handleError(errorDetails) {
        toast.error(errorDetails, {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    handleSuccess(successMessage) {
        toast.success(
            successMessage,
            {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
    }

    handleInfo(infoMessage) {
        toast.info(infoMessage, {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    createDropdownData = (data, message) => {
        var returnData = [];
        returnData.push(<option key="">{message}</option>);
        data.forEach((row) => {
            returnData.push(
                <option key={row.code} value={row.code}>
                    {row.description}
                </option>
            );
        });
        return returnData;
    };

}

export default new UtilService();
