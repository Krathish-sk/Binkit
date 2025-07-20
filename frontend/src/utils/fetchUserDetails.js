import Axios from "./axios";
import SummaryApi from "../common/summaryAPI";

export default async function fetchUserDetails() {
  try {
    const resp = await Axios({
      ...SummaryApi.userDetails,
    });

    return resp?.data;
  } catch (error) {
    console.log(error);
  }
}
