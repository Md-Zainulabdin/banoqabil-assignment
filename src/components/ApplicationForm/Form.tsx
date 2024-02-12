import { Formik } from 'formik'
import * as yup from 'yup'
import { Form, Button, Col, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { useState } from 'react'

function FormExample() {
	const [selectedCountry, setSelectedCountry] = useState('')
	const [selectedEducationCountry, setSelectedEducationCountry] = useState('')
	const [selectedProvince, setSelectedProvince] = useState('')
	const [selectedUniversity, setSelectedUniversity] = useState('')

	console.log(selectedUniversity)

	const country = useSelector((state: RootState) => state.country)
	const province = useSelector((state: RootState) => state.province)
	const city = useSelector((state: RootState) => state.city)
	const region = useSelector((state: RootState) => state.region)
	const qualification = useSelector((state: RootState) => state.qualification)
	const lastInstitution = useSelector(
		(state: RootState) => state.lastInstitution
	)
	const englishTests = useSelector((state: RootState) => state.englishTests)
	const university = useSelector((state: RootState) => state.university)
	const programTypes = useSelector((state: RootState) => state.programType)

	if (country?.loading) {
		return <div>Loading...</div>
	}

	// yop validation
	const schema = yup.object().shape({
		firstName: yup.string().required('First name is required'),
		lastName: yup.string().required('Last name is required'),
		gender: yup
			.string()
			.required('Gender is required')
			.oneOf(['Male', 'Female', 'Other'], 'Invalid gender'),
		email: yup
			.string()
			.email('Invalid email address')
			.required('Email is required'),
		phoneNo: yup.string().required('Phone number is required'),
		nationality: yup.string().required('Nationality is required'),
		dateOfBirth: yup.date().required('Date of birth is required'),
		address: yup.string().required('Address is required'),
		postalCode: yup.string().required('Postal code is required'),
		country: yup.string().required('Country is required'),
		province: yup.string().required('Province is required'),
		city: yup.string().required('City is required'),
		region: yup.string().required('Region is required'),
		nic: yup.string().required('NIC is required'),
		passport: yup.string().required('Passport is required'),
		lastEducationCountry: yup
			.string()
			.required('Last education country is required'),
		lastQualification: yup.string().required('Last qualification is required'),
		lastInstitution: yup.string().required('Last institution is required'),
		cgpa: yup
			.number()
			.min(0, 'CGPA must be greater than or equal to 0')
			.max(4, 'CGPA must be less than or equal to 4')
			.required('CGPA is required'),
		englishTest: yup.string().required('English test is required'),
		score: yup.number().required('Score is required'),
		university: yup.string().required('University is required'),
		// campus: yup.string().required('Campus is required'),
		degreeType: yup.string().required('Degree type is required'),
		program: yup.string().required('Program is required'),
	})

	const submitHandler = (values: any) => {
		console.log(values)
	}

	return (
		<Formik
			validationSchema={schema}
			onSubmit={submitHandler}
			initialValues={{
				firstName: '',
				lastName: '',
				gender: '',
				email: '',
				phoneNo: '',
				nationality: '',
				dateOfBirth: '',
				address: '',
				postalCode: '',
				country: '',
				province: '',
				city: '',
				region: '',
				nic: '',
				passport: '',
				lastEducationCountry: '',
				lastQualification: '',
				lastInstitution: '',
				cgpa: '',
				englishTest: '',
				score: '',
				university: '',
				// campus: '',
				degreeType: '',
				program: '',
			}}>
			{({ handleSubmit, handleChange, values, touched, errors }) => (
				<Form noValidate onSubmit={handleSubmit}>
					<Row className="mb-2">
						<h4>Personal Details</h4>
					</Row>

					<hr />

					<Row className="mb-3">
						<Form.Group as={Col} controlId="validationFormik03">
							<Form.Label>First Name...</Form.Label>
							<Form.Control
								type="text"
								placeholder="First Name..."
								name="firstName"
								value={values.firstName}
								onChange={handleChange}
								isInvalid={!!errors.firstName}
							/>

							<Form.Control.Feedback type="invalid">
								{errors.firstName}
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group as={Col} controlId="validationFormik03">
							<Form.Label>Last Name...</Form.Label>
							<Form.Control
								type="text"
								placeholder="Last Name..."
								name="lastName"
								value={values.lastName}
								onChange={handleChange}
								isInvalid={!!errors.lastName}
							/>

							<Form.Control.Feedback type="invalid">
								{errors.lastName}
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group as={Col} controlId="validationFormik03">
							<Form.Label>Gender...</Form.Label>
							<Form.Select
								name="gender"
								value={values.gender}
								onChange={handleChange}
								isInvalid={!!errors.gender}>
								<option value="">Select Gender...</option>
								<option value="Male">Male</option>
								<option value="Female">Female</option>
								<option value="Other">Other</option>
							</Form.Select>

							<Form.Control.Feedback type="invalid">
								{errors.gender}
							</Form.Control.Feedback>
						</Form.Group>
					</Row>

					<Row className="mb-3">
						<Form.Group as={Col} controlId="validationFormik03">
							<Form.Label>Email...</Form.Label>
							<Form.Control
								type="email"
								placeholder="Email..."
								name="email"
								value={values.email}
								onChange={handleChange}
								isInvalid={!!errors.email}
							/>

							<Form.Control.Feedback type="invalid">
								{errors.email}
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group as={Col} controlId="validationFormik03">
							<Form.Label>Phone No...</Form.Label>
							<Form.Control
								type="text"
								placeholder="Phone No..."
								name="phoneNo"
								value={values.phoneNo}
								onChange={handleChange}
								isInvalid={!!errors.phoneNo}
							/>

							<Form.Control.Feedback type="invalid">
								{errors.phoneNo}
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group as={Col} controlId="validationFormik03">
							<Form.Label>Nationality...</Form.Label>
							<Form.Select
								name="nationality"
								value={values.nationality}
								onChange={(e: any) => {
									handleChange(e)
								}}
								isInvalid={!!errors.nationality}>
								<option selected={true} value="Choose Nationality..">
									Choose Nationality...
								</option>
								{country &&
									country?.data.map((item, idx) => (
										<option key={idx} value={item}>
											{item}
										</option>
									))}
							</Form.Select>

							<Form.Control.Feedback type="invalid">
								{errors.nationality}
							</Form.Control.Feedback>
						</Form.Group>
					</Row>

					<Row className="mb-3">
						<Form.Group as={Col} controlId="validationFormik03">
							<Form.Label>Date of Birth...</Form.Label>
							<Form.Control
								type="date"
								placeholder="Date of Birth..."
								name="dateOfBirth"
								value={values.dateOfBirth}
								onChange={handleChange}
								isInvalid={!!errors.dateOfBirth}
							/>

							<Form.Control.Feedback type="invalid">
								{errors.dateOfBirth}
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group as={Col} controlId="validationFormik03">
							<Form.Label>Address...</Form.Label>
							<Form.Control
								type="text"
								placeholder="Address..."
								name="address"
								value={values.address}
								onChange={handleChange}
								isInvalid={!!errors.address}
							/>

							<Form.Control.Feedback type="invalid">
								{errors.address}
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group as={Col} controlId="validationFormik03">
							<Form.Label>Postal Code...</Form.Label>
							<Form.Control
								type="text"
								placeholder="Postal Code..."
								name="postalCode"
								value={values.postalCode}
								onChange={handleChange}
								isInvalid={!!errors.postalCode}
							/>

							<Form.Control.Feedback type="invalid">
								{errors.postalCode}
							</Form.Control.Feedback>
						</Form.Group>
					</Row>

					<Row className="mb-3">
						<Form.Group
							className="w-100"
							as={Col}
							controlId="validationFormik06">
							<Form.Label>Country</Form.Label>
							<Form.Select
								name="country"
								placeholder="Select Country..."
								defaultValue={'Choose..'}
								value={values.country}
								onChange={(e: any) => {
									handleChange(e)
									setSelectedCountry(e.target.value)
								}}
								isInvalid={touched.country && !!errors.country}>
								<option selected={true} value="Choose Country..">
									Choose Country...
								</option>
								{country &&
									country?.data?.map((item: any, idx: number) => (
										<>
											<option key={idx} value={item}>
												{item}
											</option>
										</>
									))}
								{/* Add more countries as needed */}
							</Form.Select>
							<Form.Control.Feedback type="invalid">
								{errors.country}
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group
							className="w-100"
							as={Col}
							controlId="validationFormik06">
							<Form.Label>Province</Form.Label>
							<Form.Select
								name="province"
								placeholder="Select Province..."
								defaultValue={' '}
								value={values.province}
								onChange={(e: any) => {
									handleChange(e)
									setSelectedProvince(e.target.value)
								}}
								isInvalid={touched.province && !!errors.province}>
								<option selected value="Choose Province..">
									Choose Province...
								</option>
								{province &&
									province.data
										.filter((item) => item.country === selectedCountry)
										.map((item, idx) => (
											<>
												<option key={item.name} value={item.name}>
													{item.name ? item.name : 'Other'}
												</option>
											</>
										))}
								{/* Add more countries as needed */}
							</Form.Select>
							<Form.Control.Feedback type="invalid">
								{errors.province}
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group
							className="w-100"
							as={Col}
							controlId="validationFormik06">
							<Form.Label>City</Form.Label>
							<Form.Select
								name="city"
								placeholder="Select City..."
								value={values.city}
								defaultValue={'Choose a province first...'}
								onChange={(e: any) => {
									handleChange(e)
								}}
								isInvalid={touched.city && !!errors.city}>
								<option selected value="Choose City..">
									Choose City...
								</option>
								{city &&
									city.data
										.filter(
											(item) =>
												item.country === selectedCountry &&
												(item.province == selectedProvince
													? item
													: item.country == selectedCountry
													? item
													: 'No Option')
										)
										.map((item, idx) => (
											<>
												<option key={idx} value={item.name}>
													{item.name ? item.name : 'Other'}
												</option>
											</>
										))}
								{/* Add more countries as needed */}
							</Form.Select>
							<Form.Control.Feedback type="invalid">
								{errors.city}
							</Form.Control.Feedback>
						</Form.Group>
					</Row>

					<Row className="mb-3">
						<Form.Group
							className="w-100"
							as={Col}
							controlId="validationFormik06">
							<Form.Label>Region</Form.Label>
							<Form.Select
								name="region"
								placeholder="Select Region..."
								value={values.region}
								onChange={(e: any) => {
									handleChange(e)
								}}
								isInvalid={touched.region && !!errors.region}>
								<option selected value="Choose Region..">
									Choose Region...
								</option>
								{region &&
									region.data
										.filter((item) => item.country === selectedCountry)
										.map((item, idx) => (
											<>
												<option key={idx} value={item.name}>
													{item.name ? item.name : 'Other'}
												</option>
											</>
										))}
								{/* Add more countries as needed */}
							</Form.Select>
							<Form.Control.Feedback type="invalid">
								{errors.region}
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group as={Col} controlId="validationFormik03">
							<Form.Label>NIC...</Form.Label>
							<Form.Control
								type="text"
								placeholder="NIC..."
								name="nic"
								value={values.nic}
								onChange={handleChange}
								isInvalid={!!errors.nic}
							/>

							<Form.Control.Feedback type="invalid">
								{errors.nic}
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group as={Col} controlId="validationFormik03">
							<Form.Label>Passport...</Form.Label>
							<Form.Control
								type="text"
								placeholder="Passport..."
								name="passport"
								value={values.passport}
								onChange={handleChange}
								isInvalid={!!errors.passport}
							/>

							<Form.Control.Feedback type="invalid">
								{errors.passport}
							</Form.Control.Feedback>
						</Form.Group>
					</Row>

					<Row className="mb-1 mt-2">
						<h4>Academic Details</h4>
					</Row>

					<hr />

					<Row className="mb-3">
						<Form.Group
							className="w-100"
							as={Col}
							controlId="validationFormik06">
							<Form.Label>Last education country</Form.Label>
							<Form.Select
								name="lastEducationCountry"
								placeholder="Last education country..."
								value={values.lastEducationCountry}
								onChange={(e: any) => {
									handleChange(e)
									setSelectedEducationCountry(e.target.value)
								}}
								isInvalid={
									touched.lastEducationCountry && !!errors.lastEducationCountry
								}>
								<option selected value="Choose last Education Country..">
									Choose last Education Country...
								</option>
								{country &&
									country?.data.map((item, idx) => (
										<option key={idx} value={item}>
											{item}
										</option>
									))}
								{/* Add more countries as needed */}
							</Form.Select>
							<Form.Control.Feedback type="invalid">
								{errors.lastEducationCountry}
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group
							className="w-100"
							as={Col}
							controlId="validationFormik06">
							<Form.Label>Last qualification</Form.Label>
							<Form.Select
								name="lastQualification"
								placeholder="Last qualification..."
								value={values.lastQualification}
								onChange={(e: any) => {
									handleChange(e)
								}}
								isInvalid={
									touched.lastQualification && !!errors.lastQualification
								}>
								<option selected value="Choose Last qualification..">
									Choose Last qualification...
								</option>
								{qualification &&
									qualification?.data.map((item, idx) => (
										<option key={idx} value={item.name}>
											{item.name}
										</option>
									))}
								{/* Add more countries as needed */}
							</Form.Select>
							<Form.Control.Feedback type="invalid">
								{errors.lastQualification}
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group
							className="w-100"
							as={Col}
							controlId="validationFormik06">
							<Form.Label>Last Institution</Form.Label>
							<Form.Select
								name="lastInstitution"
								placeholder="Last Institution..."
								value={values.lastInstitution}
								onChange={(e: any) => {
									handleChange(e)
								}}
								isInvalid={touched.lastInstitution && !!errors.lastInstitution}>
								<option selected value="Choose Last Institution..">
									Choose Last Institution...
								</option>
								{selectedEducationCountry &&
									lastInstitution.data
										.filter((item) => item.country == selectedEducationCountry)
										.map((item, idx) => (
											<option key={idx} value={item.name}>
												{item.name}
											</option>
										))}
								{/* Add more countries as needed */}
							</Form.Select>
							<Form.Control.Feedback type="invalid">
								{errors.lastQualification}
							</Form.Control.Feedback>
						</Form.Group>
					</Row>

					<Row className="mb-3">
						<Form.Group as={Col} controlId="validationFormik03">
							<Form.Label>CGPA...</Form.Label>
							<Form.Control
								type="number"
								placeholder="CGPA..."
								name="cgpa"
								value={values.cgpa}
								onChange={handleChange}
								isInvalid={!!errors.cgpa}
							/>

							<Form.Control.Feedback type="invalid">
								{errors.cgpa}
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group
							className="w-100"
							as={Col}
							controlId="validationFormik06">
							<Form.Label>English tests</Form.Label>
							<Form.Select
								name="englishTest"
								placeholder="Select English tests..."
								value={values.englishTest}
								onChange={(e: any) => {
									handleChange(e)
								}}
								isInvalid={touched.englishTest && !!errors.englishTest}>
								<option selected value="Choose English Test..">
									Choose English Test...
								</option>
								{englishTests &&
									englishTests?.data.map((item, idx) => (
										<>
											<option key={idx} value={item.name}>
												{item.name ? item.name : 'Other'}
											</option>
										</>
									))}
								{/* Add more countries as needed */}
							</Form.Select>
							<Form.Control.Feedback type="invalid">
								{errors.englishTest}
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group as={Col} controlId="validationFormik03">
							<Form.Label>Score...</Form.Label>
							<Form.Control
								type="text"
								placeholder="Score..."
								name="score"
								value={values.score}
								onChange={handleChange}
								isInvalid={!!errors.score}
							/>

							<Form.Control.Feedback type="invalid">
								{errors.score}
							</Form.Control.Feedback>
						</Form.Group>
					</Row>

					<Row className="mb-1 mt-2">
						<h4>Suggested University</h4>
					</Row>

					<hr />

					<Row className="mb-3">
						<Form.Group
							className="w-100"
							as={Col}
							controlId="validationFormik06">
							<Form.Label>University</Form.Label>
							<Form.Select
								name="university"
								placeholder="Select University..."
								defaultValue={'Choose..'}
								value={values.university}
								onChange={(e: any) => {
									handleChange(e)
									setSelectedUniversity(e.target.value)
								}}
								isInvalid={touched.university && !!errors.university}>
								<option selected={true} value="Choose University..">
									Choose University...
								</option>
								{university &&
									university?.data?.map((item: any, idx: number) => (
										<>
											<option key={idx} value={item.universityName}>
												{item.universityName}
											</option>
										</>
									))}
								{/* Add more countries as needed */}
							</Form.Select>
							<Form.Control.Feedback type="invalid">
								{errors.university}
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group
							className="w-100"
							as={Col}
							controlId="validationFormik06">
							<Form.Label>Degree Type</Form.Label>
							<Form.Select
								name="degreeType"
								placeholder="Select Degree Type..."
								value={values.degreeType}
								defaultValue={'Choose a province first...'}
								onChange={(e: any) => {
									handleChange(e)
								}}
								isInvalid={touched.degreeType && !!errors.degreeType}>
								<option selected value="Choose Degree Type..">
									Choose Degree Type...
								</option>
								{programTypes &&
									programTypes.data.map((item, idx) => (
										<option key={idx} value={item.name}>
											{item.name ? `${item.name} - ${item.graduate}` : 'Other'}
										</option>
									))}
								{/* Add more countries as needed */}
							</Form.Select>
							<Form.Control.Feedback type="invalid">
								{errors.degreeType}
							</Form.Control.Feedback>
						</Form.Group>
					</Row>

					<Row className="mb-3">
						<Form.Group as={Col} controlId="validationFormik03">
							<Form.Label>Program...</Form.Label>
							<Form.Control
								type="text"
								placeholder="Program..."
								name="program"
								value={values.program}
								onChange={handleChange}
								isInvalid={!!errors.program}
							/>

							<Form.Control.Feedback type="invalid">
								{errors.program}
							</Form.Control.Feedback>
						</Form.Group>
					</Row>

					<Button type="submit">Submit form</Button>
				</Form>
			)}
		</Formik>
	)
}

export default FormExample
