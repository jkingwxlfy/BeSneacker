import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import store from '@/store/index'
import { Provider } from 'react-redux'

import App from './components/app/App'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
)
