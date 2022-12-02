import React from 'react'
import { GlobalState } from '../../context/GlobalProvider'
import { isSanderMargin } from '../../utils/utlis'

export default function ScrollableChat({ messages }) {

    const { user } = GlobalState()

    return (
        <div style={{ overflowX: "hidden", overflowY: "auto" }}>
            {
                messages && messages.map(msg => (
                    <div style={{ display: "flex" }} key={msg._id}>
                        <span
                            style={{
                                backgroundColor: `${msg.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                                    }`,
                                marginLeft: isSanderMargin(msg, user._id),
                                marginTop: '8px',
                                borderRadius: "20px",
                                padding: "5px 15px",
                                maxWidth: "50%",
                            }}
                        >
                            {msg.content}
                        </span>
                    </div>
                ))
            }
        </div>
    )
}
