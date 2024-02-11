import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Card, Col, Nav, Row, Tab } from 'react-bootstrap'

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
import Documents from './Documents'
import Logs from './Logs'
import Desks from './Desks'

interface TabContentItem {
	id: string
	// icon: string;
	title: string
	body: React.ReactNode
}

const tabContents: TabContentItem[] = [
	{
		id: '01',
		title: 'Update Form',
		body: <FormExample />,
	},
	{
		id: '02',
		title: 'Documents',
		body: <Documents />,
	},
	{
		id: '03',
		title: 'Logs',
		body: <Logs />,
	},
	{
		id: '04',
		title: 'Desks',
		body: <Desks />,
	},
]

const UpdateApplicationForm = () => {
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
				<Card.Body>
					<Tab.Container defaultActiveKey="Update Form">
						<Nav variant="tabs" justify className="nav-bordered" as="ul">
							{(tabContents || []).map((tab, idx) => {
								return (
									<Nav.Item key={idx} as="li">
										<Nav.Link eventKey={tab.title}>
											<span className="d-none d-md-block">{tab.title}</span>
										</Nav.Link>
									</Nav.Item>
								)
							})}
						</Nav>

						<Tab.Content className="mt-4 px-2">
							{(tabContents || []).map((tab, idx) => {
								return (
									<Tab.Pane eventKey={tab.title} id={tab.id} key={idx}>
										<Row>
											<Col sm="12">{tab.body}</Col>
										</Row>
									</Tab.Pane>
								)
							})}
						</Tab.Content>
					</Tab.Container>
				</Card.Body>
			</Card>
		</div>
	)
}

export default UpdateApplicationForm
