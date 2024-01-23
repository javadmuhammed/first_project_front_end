import React, { useEffect, useState } from 'react'
import DashBoardLayout from './DashBoardLayout'
import DashboardSectionTitle from '../../../Component/Util/Title/DashboardSectionTitle'
import WhiteBox from '../../../Component/Util/Box/WhiteBox'
import SimpleTable from '../../../Component/Util/Table/SimpleTable'
import FullBox from '../../../Component/Util/Box/FullBox'
import Button1 from '../../../Component/Util/Buttons/Button1'
import InputWithLabel from '../../../Component/Util/Input/InputWithLabel'
import SelectOneWithLabel from '../../../Component/Util/Input/SelectOneWithLabel'
import { const_data } from '../../../CONST/const_data'
import HistoryComponent from '../../../Component/History/HistoryComponent'
import { useDispatch, useSelector } from 'react-redux'
import { getUserWalletHistory } from '../../../API/api_request'
import WalletTopUpForm from '../../../Component/Other/WalletTopUpForm'
import { getValidDateFormat } from '../../../helper/HelperFunction'
import { getUserByJwtToken } from '../../../redux/slice/UserSlicer'
import EmptyScreen from '../../../Component/Util/Box/EmptyScreen'


function ManageWallet() {


  let userData = useSelector((state) => state.userAuth.user)
  let [userWalletHistory, walletHistoryUpdate] = useState([{}])
  let [userHistoryBoolean, setUserHistoryBoolean] = useState([{}])
  let dispatch = useDispatch();

  useEffect(() => {
    getUserWalletHistory().then((data) => {
      let response = data?.data; 
      if (response?.status) {
        let history = response?.history?.wallet_details;
        console.log(history)
        walletHistoryUpdate(history)
      }
    }).catch((err) => {

    })
  }, [userHistoryBoolean])

  async function onPaymentSuccess() {
    setUserHistoryBoolean(!userHistoryBoolean)
    dispatch(await getUserByJwtToken({ jwt: userData.access_token }))
  }




  return (
    <DashBoardLayout>
      <DashboardSectionTitle title={"My Wallet"} icon={"uil-wallet"}></DashboardSectionTitle>
      <div className="row mt-3">
        <div className="col-md-6">
          <WhiteBox>
            <div className="itemWalletBox">
              <div class="reward-body-dtt">
                <div class="reward-img-icon">
                  <img src="images/money.svg" alt="" />
                </div>
                <span class="rewrd-title">My Balance</span>
                <h4 class="cashbk-price">{const_data.CURRENCY_ICON + userData?.wallet_amount}</h4>
                <span class="date-reward">Last Updated : {!userData.last_wallet_update ? "No Update" : getValidDateFormat(userData.last_wallet_update)}</span>
              </div>
            </div>
          </WhiteBox>
        </div>
        <div className="col-md-6">
          <WhiteBox>
            <div className="itemWalletBox">
              <div class="reward-body-dtt">
                <div class="reward-img-icon">
                  <img src="images/money.svg" alt="" />
                </div>
                <span class="rewrd-title">Total Credited</span>
                <h4 class="cashbk-price">{const_data.CURRENCY_ICON + userData.total_wallet_credit}</h4>
                <span class="date-reward">Last Updated : {!userData.last_wallet_update ? "No Update" : getValidDateFormat(userData.last_wallet_update)}</span>
              </div>
            </div>
          </WhiteBox>
        </div>

        <div className="col-md-6">
          <WalletTopUpForm on_success={onPaymentSuccess}></WalletTopUpForm>
        </div>
        <div className="col-md-6">
          <FullBox withoutFooter={true} title={<h4>Topup History</h4>}>
            <div class="history-body scrollstyle_4" style={{ height: "auto" }}>
              <ul class="history-list">

                {/* {
                  userWalletHistory?.length < 1 || !userWalletHistory ? (
                    <EmptyScreen bgColor={"white"} content={"You don;t have any transactionns"} title={"Empty Transactions"}></EmptyScreen>
                  ) : (
                    userWalletHistory?.map((history) => {
                      return (
                        <li className='d-block'>
                          <HistoryComponent title={history?.via} subHeading={<span>Payment ID  <ins>{history?.payment_id ?? "Offline Credit"}</ins></span>} footer={getValidDateFormat(history?.date)} tile={history?.amount + const_data.CURRENCY_ICON} ></HistoryComponent>
                        </li>
                      )
                    })
                  )
                } */}


              </ul>
            </div>
          </FullBox>
        </div>
      </div>

    </DashBoardLayout>
  )
}

export default ManageWallet
