import React, { ReactNode, useEffect } from 'react'

//images
import { Card, Col, Container, Image, Row } from 'react-bootstrap'

interface AccountLayoutProps {
	pageImage?: string
	authTitle?: string
	helpText?: string
	bottomLinks?: ReactNode
	isCombineForm?: boolean
	children?: ReactNode
	hasForm?: boolean
	hasThirdPartyLogin?: boolean
	userImage?: string
	starterClass?: boolean
}

const AuthLayout = ({
	authTitle,
	helpText,
	bottomLinks,
	children,
	userImage,
	starterClass,
}: AccountLayoutProps) => {
	useEffect(() => {
		if (document.body) {
			document.body.classList.add('authentication-bg', 'position-relative')
		}

		return () => {
			if (document.body) {
				document.body.classList.remove('authentication-bg', 'position-relative')
			}
		}
	}, [])

	return (
		<div className="authentication-bg position-relative">
			<div className="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5 position-relative">
				<Container>
					<Row className="justify-content-center">
						<Card className="overflow-hidden">
							<Col lg={12}>
								<div className="d-flex flex-column h-100">
									<div className="auth-brand pt-4 px-2 pb-0">
										<a href="/">
											<img
												src="/images/ieo-logo.webp"
												alt="logo"
												className="pd-0 pb-4"
												width={130}
											/>
										</a>
									</div>
									<div
										className={`p-4 pt-0 my-auto ${
											starterClass ? 'text-center' : ''
										}`}>
										{userImage ? (
											<div className="text-center w-75 m-auto">
												<Image
													src={userImage}
													height={64}
													alt="user-image"
													className="rounded-circle img-fluid img-thumbnail avatar-xl"
												/>
												<h4 className="text-center mt-3 fw-bold fs-20">
													{authTitle}{' '}
												</h4>
												<p className="text-muted mb-4">{helpText}</p>
											</div>
										) : (
											<React.Fragment>
												<h4 className="fs-20">{authTitle}</h4>
												<p className="text-muted mb-3">{helpText}</p>
											</React.Fragment>
										)}

										{children}
									</div>
								</div>
							</Col>
						</Card>
					</Row>
					{bottomLinks}
				</Container>
			</div>
			<footer className="footer footer-alt fw-medium">
				<span className="text-dark">
					{new Date().getFullYear()} © Technology Partner - Cloud Lab Private
					Ltd (c) 2024
				</span>
			</footer>
		</div>
	)
}

export default AuthLayout
