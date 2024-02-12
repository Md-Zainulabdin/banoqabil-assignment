import { useAuthContext } from '@/common'
import { useGetAgentByIdQuery } from '@/redux/api/AgentsApi'
import { useState } from 'react'
import {Col, Modal, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

interface AgentModalProps {
	show: boolean
	onHide: () => void
	agent_id: string
}

const AgentModal = ({ show, onHide, agent_id }: AgentModalProps) => {
	const [fullscreen] = useState<undefined | string>(undefined)
	const { user } = useAuthContext()

	const { data, isLoading, isSuccess } = useGetAgentByIdQuery({
		userId: agent_id,
		token: user.token,
	})

	return (
		<div>
			<Modal show={show} fullscreen={fullscreen ?? true} onHide={onHide}>
				<Modal.Header closeButton className="px-4">
					<Modal.Title className="text-primary">Agent Details</Modal.Title>
				</Modal.Header>
				<Modal.Body className="p-4">
					{isLoading ? (
						<div>Loading...</div>
					) : isSuccess ? (
						<>
							<Row className="mb-1">
								<h4 className="text-primary">Personal Information</h4>
							</Row>

							<hr />

							<Row className="mb-3">
								<Col sm={4}>
									<div>
										<h5>Firs tName</h5>
										<span className="fs-18">
											{data?.studentId?.firstname || '-'}
										</span>
									</div>
								</Col>
								<Col sm={4}>
									<div>
										<h5>Last Name</h5>
										<span className="fs-18">
											{data?.studentId?.lastname || '-'}
										</span>
									</div>
								</Col>
								<Col sm={4}>
									<div>
										<h5>Gender</h5>
										<span className="fs-18">
											{data?.studentId?.gender || '-'}
										</span>
									</div>
								</Col>
							</Row>

							<Row className="mb-3">
								<Col sm={4}>
									<div>
										<h5>Email</h5>
										<span className="fs-18">
											{data?.studentId?.email || '-'}
										</span>
									</div>
								</Col>
								<Col sm={4}>
									<div>
										<h5>Phone no</h5>
										<span className="fs-18">
											{data?.studentId?.phoneNo || '-'}
										</span>
									</div>
								</Col>
								<Col sm={4}>
									<div>
										<h5>Nationality</h5>
										<span className="fs-18">
											{data?.studentId?.nationality || '-'}
										</span>
									</div>
								</Col>
							</Row>

							<Row className="mb-3">
								<Col sm={4}>
									<div>
										<h5>Date of birth</h5>
										<span className="fs-18">
											{data?.studentId?.dateOfBirth
												? `${data?.studentId?.dateOfBirth} - ${data?.studentId?.monthOfBirth} - ${data?.studentId?.yearOfBirth}`
												: '-'}
										</span>
									</div>
								</Col>
								<Col sm={4}>
									<div>
										<h5>Address</h5>
										<span className="fs-18">
											{data?.studentId?.address || '-'}
										</span>
									</div>
								</Col>
								<Col sm={4}>
									<div>
										<h5>Postal code</h5>
										<span className="fs-18">
											{data?.studentId?.postalCode || '-'}
										</span>
									</div>
								</Col>
							</Row>

							<Row className="mb-3">
								<Col sm={4}>
									<div>
										<h5>Region</h5>
										<span className="fs-18">
											{data?.studentId?.region || '-'}
										</span>
									</div>
								</Col>
								<Col sm={4}>
									<div>
										<h5>Country living in</h5>
										<span className="fs-18">
											{data?.studentId?.countryLivingIn || '-'}
										</span>
									</div>
								</Col>
								<Col sm={4}>
									<div>
										<h5>Province</h5>
										<span className="fs-18">
											{data?.studentId?.province || '-'}
										</span>
									</div>
								</Col>
							</Row>

							<Row className="mb-3">
								<Col xl={4}>
									<div>
										<h5>NIC</h5>
										<span className="fs-18">
											{data?.studentId?.nic ? data?.studentId?.nic : '-'}
										</span>
									</div>
								</Col>
								<Col xl={4}>
									<div>
										<h5>Passport</h5>
										<span className="fs-18">
											{data?.studentId?.passport || '-'}
										</span>
									</div>
								</Col>
							</Row>

							<Row className="mb-1">
								<h4 className="text-primary">Academic Details</h4>
							</Row>

							<hr />

							<Row className="mb-3">
								<Col sm={4}>
									<div>
										<h5>Last Education Country</h5>
										<span className="fs-18">
											{data?.studentId?.lastEducationCountry || '-'}
										</span>
									</div>
								</Col>
								<Col sm={4}>
									<div>
										<h5>Last Qualification</h5>
										<span className="fs-18">
											{data?.studentId?.lastQualification || '-'}
										</span>
									</div>
								</Col>
								<Col sm={4}>
									<div>
										<h5>Last Institution</h5>
										<span className="fs-18">
											{data?.studentId?.lastInstitution || '-'}
										</span>
									</div>
								</Col>
							</Row>

							<Row className="mb-3">
								<Col sm={4}>
									<div>
										<h5>CGPA</h5>
										<span className="fs-18">
											{data?.studentId?.CGPA || '-'}
										</span>
									</div>
								</Col>
								<Col sm={4}>
									<div>
										<h5>English Test</h5>
										<span className="fs-18">
											{data?.studentId?.englishTest || '-'}
										</span>
									</div>
								</Col>
								<Col sm={4}>
									<div>
										<h5>Score</h5>
										<span className="fs-18">
											{data?.studentId?.score ? data?.studentId?.score : '-'}
										</span>
									</div>
								</Col>
							</Row>

							<Row className="mb-1 mt-2">
								<h4 className="text-primary">University Details</h4>
							</Row>

							<hr />

							<Row className="mb-3">
								<Col sm={4}>
									<div>
										<h5>University</h5>
										<span className="fs-18">
											{isSuccess && data?.universityName
												? data.universityName
												: '-'}
										</span>
									</div>
								</Col>
								<Col sm={4}>
									<div>
										<h5>Campus</h5>
										<span className="fs-18">
											{isSuccess && data?.campus ? data.campus : '-'}
										</span>
									</div>
								</Col>
								<Col sm={4}>
									<div>
										<h5>Degree Type</h5>
										<span className="fs-18">
											{isSuccess && data?.programId?.programTypeName
												? `${data?.programId?.programTypeName} ${data?.programId?.programTypeGraduate}`
												: '-'}
										</span>
									</div>
								</Col>
							</Row>

							<Row className="mb-3">
								<Col sm={4}>
									<div>
										<h5>Subject</h5>
										<span className="fs-18">
											{isSuccess && data?.subject ? data.subject : '-'}
										</span>
									</div>
								</Col>
								<Col sm={4}>
									<div>
										<h5>Degree</h5>
										<span className="fs-18">
											{isSuccess && data?.degree ? data.degree : '-'}
										</span>
									</div>
								</Col>
								<Col sm={4}>
									<div>
										<h5>Applied Date</h5>
										<span className="fs-18">
											{isSuccess && data?.appliedDate
												? `${data?.appliedDate} - ${data?.appliedMonth} - ${data?.appliedYear}`
												: '-'}
										</span>
									</div>
								</Col>
							</Row>

							<Row className="mb-3">
								<Col sm={4}>
									<div>
										<h5>Status</h5>
										<span className="fs-18">
											{isSuccess && data?.status ? data.status : '-'}
										</span>
									</div>
								</Col>
								<Col sm={4}>
									<div>
										<h5>Application Type</h5>
										<span className="fs-18">
											{isSuccess && data?.application_type
												? data.application_type
												: '-'}
										</span>
									</div>
								</Col>
							</Row>

							<Row className="mb-1 mt-2">
								<h4 className="text-primary">Other Details</h4>
							</Row>

							<hr />

							<Row className="mb-3">
								<Col sm={4}>
									<div>
										<h5>Final Session Applied</h5>
										<span className="fs-18">
											{isSuccess && data?.final_session_applied
												? data.final_session_applied
												: '-'}
										</span>
									</div>
								</Col>
								<Col sm={4}>
									<div>
										<h5>Combined Session</h5>
										<span className="fs-18">
											{isSuccess && data?.combined_session
												? data.combined_session
												: '-'}
										</span>
									</div>
								</Col>
								<Col sm={4}>
									<div>
										<h5>Year</h5>
										<span className="fs-18">
											{isSuccess && data?.year ? data.year : '-'}
										</span>
									</div>
								</Col>
							</Row>

							<Row className="mb-3">
								<Col sm={4}>
									<div>
										<h5>Agent / Office / Direct</h5>
										<span className="fs-18">
											{isSuccess && data?.['agent_/_office_/_direct']
												? data['agent_/_office_/_direct']
												: '-'}
										</span>
									</div>
								</Col>
								<Col sm={4}>
									<div>
										<h5>Name of Agent / Office</h5>
										<span className="fs-18">
											{isSuccess && data?.[`name_of_agent_/_office`]
												? data[`name_of_agent_/_office`]
												: '-'}
										</span>
									</div>
								</Col>
								<Col sm={4}>
									<div>
										<h5>Reference Number</h5>
										<span className="fs-18">
											{isSuccess && data?.reference_number
												? data.reference_number
												: '-'}
										</span>
									</div>
								</Col>
							</Row>

							<Row className="mb-3">
								<Col sm={4}>
									<div>
										<h5>Apply Date to Uni</h5>
										<span className="fs-18">
											{isSuccess && data?.apply_date_to_uniDate
												? `${data?.apply_date_to_uniDate} - ${data?.apply_date_to_uniMonth} - ${data?.apply_date_to_uniYear}`
												: '-'}
										</span>
									</div>
								</Col>
								<Col sm={4}>
									<div>
										<h5>Apply Month</h5>
										<span className="fs-18">
											{isSuccess && data?.apply_month ? data.apply_month : '-'}
										</span>
									</div>
								</Col>
								<Col sm={4}>
									<div>
										<h5>Date of Offer</h5>
										<span className="fs-18">
											{isSuccess && data?.date_of_offerDate
												? `${data?.date_of_offerDate} - ${data?.date_of_offerMonth} - ${data?.date_of_offerYear}`
												: '-'}
										</span>
									</div>
								</Col>
							</Row>

							<Row className="mb-3">
								<Col sm={4}>
									<div>
										<h5>Offer Month</h5>
										<span className="fs-18">
											{isSuccess && data?.offer_month ? data.offer_month : '-'}
										</span>
									</div>
								</Col>
								<Col sm={4}>
									<div>
										<h5>Select Currency</h5>
										<span className="fs-18">
											{isSuccess && data?.select_currency
												? data.select_currency
												: '-'}
										</span>
									</div>
								</Col>
								<Col sm={4}>
									<div>
										<h5>Total Fee on Offer</h5>
										<span className="fs-18">
											{isSuccess && data?.total_fee_on_offer
												? data.total_fee_on_offer
												: '-'}
										</span>
									</div>
								</Col>
							</Row>

							<Row className="mb-3">
								<Col sm={4}>
									<div>
										<h5>Scholarship on Offer</h5>
										<span className="fs-18">
											{isSuccess && data?.scholarship_on_offer
												? data.scholarship_on_offer
												: '-'}
										</span>
									</div>
								</Col>
								<Col sm={4}>
									<div>
										<h5>Net Fee on Offer</h5>
										<span className="fs-18">
											{isSuccess && data?.net_fee_on_offer
												? data.net_fee_on_offer
												: '-'}
										</span>
									</div>
								</Col>
								<Col sm={4}>
									<div>
										<h5>Deposit Date</h5>
										<span className="fs-18">
											{isSuccess && data?.deposit_date
												? data.deposit_date
												: '-'}
										</span>
									</div>
								</Col>
							</Row>

							<Row className="mb-3">
								<Col sm={4}>
									<div>
										<h5>Deposit Month</h5>
										<span className="fs-18">
											{isSuccess && data?.deposit_month
												? data.deposit_month
												: '-'}
										</span>
									</div>
								</Col>
								<Col sm={4}>
									<div>
										<h5>Nok (Name)</h5>
										<span className="fs-18">
											{isSuccess && data?.['nok_(name)']
												? data['nok_(name)']
												: '-'}
										</span>
									</div>
								</Col>
								<Col sm={4}>
									<div>
										<h5>Nok (Relationship)</h5>
										<span className="fs-18">
											{isSuccess && data?.['nok_(relationship)']
												? data['nok_(relationship)']
												: '-'}
										</span>
									</div>
								</Col>
							</Row>

							{/* Add more rows for the remaining fields */}
						</>
					) : (
						<>
							<div className="text-center"></div>
							<h5>Failed to load agent details.</h5>
						</>
					)}
				</Modal.Body>
				<Modal.Footer>
					<Link to="#" className="btn btn-light waves-effect" onClick={onHide}>
						Close
					</Link>
				</Modal.Footer>
			</Modal>
		</div>
	)
}

export default AgentModal
