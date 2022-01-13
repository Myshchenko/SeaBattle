import { observer } from "mobx-react-lite"
import React from "react"
import ProfileContent from "./ProfileContent"
import ProfileHeader from "./ProfileHeader"

export default observer(function UserProfile() {
    return (
        <>
            <ProfileHeader/>
            <ProfileContent/>
        </>
    )
})