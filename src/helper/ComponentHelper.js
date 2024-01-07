import { const_data } from "../CONST/const_data"
import Error1Alert from "../Component/Alert/Error/Error1"
import Success1Alert from "../Component/Alert/Success/Success1"
import Warning1Alert from "../Component/Alert/Warning/Warning1"

const ComponentHelper = {
    fetchComponent: function (type, msg) {
        console.log(type, msg)
        switch (type) {
            case const_data.ALERT_TYPE.ERROR:
                return <Error1Alert msg={msg} visibility={true} />;
            case const_data.ALERT_TYPE.SUCCESS:
                return <Success1Alert msg={msg} visibility={true} />
            case const_data.ALERT_TYPE.WARNING:
                return <Warning1Alert msg={msg} visibility={true} />
            default:
                return null;
        }
    }
}

export default ComponentHelper;