import React from 'react'

function SimpleTable({ title, heading, body }) {
    console.log(body)
    return (
        <div class="pdpt-bg">
            <div class="pdpt-title">
                <h4>{title}</h4>
            </div>
            <div class="active-offers-body">
                <div class="table-responsive">
                    <table class="table ucp-table earning__table">
                        <thead class="thead-s">
                            <tr>
                                {
                                    heading?.map((headItem, index) => {
                                        return <th key={index} scope="col">{headItem}</th>
                                    })
                                }
                            </tr>
                        </thead>
                        {/* <tbody>
                            {
                                body?.map((bodyItem) => {
                                    if (!bodyItem) {
                                        return
                                    }
                                    return (
                                        <tr>
                                            <td>{bodyData?.id}</td>
                                            <td>{bodyData?.amount}</td>
                                            <td>{bodyData?.date}</td>
                                            <td>{bodyData?.id}</td>
                                            <td>{bodyData?.id}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody> */}
                    </table>
                </div>
            </div>
        </div>
    )
}

export default SimpleTable
