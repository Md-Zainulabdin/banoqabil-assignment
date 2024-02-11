import { useGetUniversityQuery } from '@/redux/api/UniversityGuideApi'
import './style.css'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const UniversityGuide = () => {
	const { data, isLoading, isError } = useGetUniversityQuery('')
	const [show, setShow] = useState(false)
	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

	if (isError) {
		return <div>Something went wrong ...</div>
	}
	return (
		<div>
			<div className="px-1 pt-4 pb-3">
				<h3>University Guide</h3>
			</div>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Modal heading</Modal.Title>
				</Modal.Header>
				<Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleClose}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>

			<div className="w-100 d-flex justify-content-center align-items-center flex-wrap gap-4">
				{isLoading && (
					<>
						<div>Loading...</div>
					</>
				)}
				{data &&
					data.map((item: any, idx: number) => (
						<div className="guide-card">
							<div className="image">
								<img
									src={`https://crm.internationaleducationoffice.co.uk/universities/images/${item.logoImage}`}
									alt="University Image"
								/>
							</div>
							<div className="p-3">
								<h4>{item.universityName}</h4>
								<span
									className="fs-13 text-primary link"
									style={{ cursor: 'pointer' }}
									onClick={() => {
										handleShow()
									}}>
									View Details
								</span>
							</div>
						</div>
					))}
			</div>
		</div>
	)
}

export default UniversityGuide
