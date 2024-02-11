import App from './App'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'regenerator-runtime/runtime'
import { Provider } from 'react-redux'
import { store } from './redux/store'

const container = document.getElementById('root')
if (container) {
	const root = createRoot(container)
	root.render(
		// <React.StrictMode>
		<BrowserRouter basename={''}>
			<Provider store={store}>
				<App />
			</Provider>
		</BrowserRouter>
		// </React.StrictMode>,
	)
}
