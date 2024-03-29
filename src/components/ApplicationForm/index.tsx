import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Card, Col, Row } from 'react-bootstrap'

import FormExample from './Form'

import { AppDispatch } from '@/redux/store'
import { fetchCountry } from '@/redux/features/countrySlice'
import { fetchProvince } from '@/redux/features/provinceSlice'
import { fetchCity } from '@/redux/features/citySlice'
import { fetchRegion } from '@/redux/features/regionSlice'
import { fetchPrograms } from '@/redux/features/programSlice'
import { fetchQualification } from '@/redux/features/qualificationSlice'
import { fetchLastInstitution } from '@/redux/features/lastInstitutionSlice'
import { fetchEnglishTest } from '@/redux/features/englishTestSlice'
import { fetchUniversity } from '@/redux/features/universtieSlice'
import { fetchProgramTypes } from '@/redux/features/programType'


const ApplicationForm = () => {
	const dispatch: AppDispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchCountry())
		dispatch(fetchProvince())
		dispatch(fetchCity())
		dispatch(fetchRegion())
		dispatch(fetchQualification())
		dispatch(fetchLastInstitution())
		dispatch(fetchEnglishTest())
		dispatch(fetchUniversity())
		dispatch(fetchPrograms())
		dispatch(fetchProgramTypes())
	}, [dispatch])
	return (
		<div>
			<Card>
				<Row className="px-3 py-2">
					<Col xl={12}>
						<Card>
							<Card.Header>
								<h4 className="header-title">Application Form</h4>
								<p className="text-muted mb-0">Fill your information here</p>
							</Card.Header>
							<Card.Body>
								<FormExample />
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Card>
		</div>
	)
}

export default ApplicationForm
