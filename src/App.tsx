import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import StateManagement from './pages/state-management'
import WhatIsTanstackQuery from './pages/what-is-tanstack-query'
import ProblemsWithUseEffect from './pages/problems-with-use-effect'
import BasicReactQuery from './pages/basic-react-query'
import QueryKeys from './pages/query-keys'
import SearchQuery from './pages/search-query'
import InfiniteQuery from './pages/infinite-query'
import Mutations from './pages/mutations'
import Caching from './pages/caching'
import Terminology from './pages/terminology'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/state-management" element={<StateManagement />} />
                <Route path="/what-is-tanstack-query" element={<WhatIsTanstackQuery />} />
                <Route path="/problems-with-use-effect" element={<ProblemsWithUseEffect />} />
                <Route path="/basic-react-query" element={<BasicReactQuery />} />
                <Route path="/query-keys" element={<QueryKeys />} />
                <Route path="/search-query" element={<SearchQuery />} />
                <Route path="/infinite-query" element={<InfiniteQuery />} />
                <Route path="/mutations" element={<Mutations />} />
                <Route path="/caching" element={<Caching />} />
                <Route path="/terminology" element={<Terminology />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
