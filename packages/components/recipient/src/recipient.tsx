import React, { Fragment, HTMLProps } from "react"
import { isEmpty, generateCN } from "@wpmudev/sui-utils"

import { Avatar } from "@wpmudev/sui-avatar"

import { RecipientName } from "./recipient-name"
import { RecipientEmail } from "./recipient-email"
import { RecipientButton } from "./recipient-button"

interface RecipientProps extends HTMLProps<HTMLDivElement> {
	userName?: string
	userEmail?: string
	userImage?: string
	userConfirmed?: boolean
	isInvited?: boolean
	appearance?: string
}

// Build "recipient" component
const Recipient: React.FC<RecipientProps> = ({
	userName = "",
	userEmail = "",
	userImage = "",
	userConfirmed = false,
	isInvited = false,
	appearance,
	...props
}) => {
	// Define recipient class.
	const className = generateCN("sui-recipient", {
		// Define recipient appearance.
		[appearance]: !isEmpty(appearance ?? ""),
	})

	return (
		<div className={className} {...props}>
			<div className="sui-recipient__info">
				<Avatar
					className="sui-recipient__avatar"
					{...(userConfirmed && { status: "confirmed" })}
					{...(!isEmpty(userImage) && { image: userImage })}
				/>
				{(!isEmpty(userName) || !isEmpty(userEmail)) && (
					<div className="sui-recipient__details">
						{!isEmpty(userName) && <RecipientName>{userName}</RecipientName>}
						{!isEmpty(userEmail) && (
							<RecipientEmail>{userEmail}</RecipientEmail>
						)}
					</div>
				)}
			</div>
			<div className="sui-recipient__actions">
				{!isInvited && (
					<RecipientButton
						className="sui-recipient__button"
						icon="add"
						color="black"
					>
						Add recipient
					</RecipientButton>
				)}
				{isInvited && (
					<Fragment>
						<RecipientButton
							className="sui-recipient__button"
							icon="submit"
							color="black"
						>
							Send recipient
						</RecipientButton>
						<RecipientButton
							className="sui-recipient__button"
							icon="trash"
							color="red"
						>
							Delete recipient
						</RecipientButton>
					</Fragment>
				)}
			</div>
		</div>
	)
}

// Publish required component.
export { Recipient }