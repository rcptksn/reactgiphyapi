import React, { Component } from 'react'
import SearchList from './SearchList'

class SearchForm extends Component {
    constructor(props){
        super(props);
        this.state= {
            isSearch: false,
            apiTrendURL: "https://api.giphy.com/v1/gifs/trending?api_key=wuG901dsm94iHrP02PJ1NVDZvzoNXdfB&limit=25&rating=G",
            apiURL: "https://api.giphy.com/v1/gifs/search?",
            apiKey: "api_key=wuG901dsm94iHrP02PJ1NVDZvzoNXdfB",
            lang: "tr",
            limit: "25",
            rating: "G",
            query: "",
            createAPIURL: "",
            setJsonData: [],
            pageTitle: "Trend Gifler"
        };

        this.searchForm= this.searchForm.bind(this);
        this.queryChange = this.queryChange.bind(this);
        this.limitChange = this.limitChange.bind(this);
        this.ratingChange = this.ratingChange.bind(this);
        this.langChange = this.langChange.bind(this);
    }

    queryChange(event){
        this.setState({
            query: event.target.value
        });
    }

    limitChange(event){
        this.setState({
            limit: event.target.value
        });
    }

    ratingChange(event){
        this.setState({
            rating: event.target.value
        });
    }

    langChange(event){
        this.setState({
            lang: event.target.value
        });
    }

    searchForm(event){
        const {query, apiURL, apiKey, limit, lang, rating} = this.state;
        if(query != "")
        {
            this.setState({
                createAPIURL: apiURL + apiKey + "&q=" + query + "&limit=" + limit + "&rating=" + rating + "&lang=" + lang,
                isSearch: true,
                pageTitle: this.state.query + " için arama sonuçları"
            });
        }
    }

    render() {
        const {createAPIURL, isSearch, setJsonData, apiTrendURL, pageTitle} = this.state;
        fetch(!isSearch ? apiTrendURL : createAPIURL)
        .then((res) => { return res.json()})
        .then((res) => {
            this.setState({
                setJsonData: res.data
            });
        });
        return (
            <div className="pageApp">
                <div className="card pageSearchForm">
                    <div className="col-12">
                        <div className="mb-3">
                            <input type="text" className="form-control" id="firstName" placeholder="Birşeyler yazın..." value={this.state.query} onChange={this.queryChange} />
                        </div>
                        <div className="row">
                            <div className="col-md-5 mb-3">
                                <label>Dil Seçin</label>
                                <select className="custom-select d-block w-100" id="country" value={this.state.lang} onChange={this.langChange}>
                                    <option value="TR">TR</option>
                                    <option value="EN">EN</option>
                                </select>
                            </div>
                            <div className="col-md-4 mb-3">
                                <label>Derece</label>
                                <select className="custom-select d-block w-100" id="state" value={this.state.rating} onChange={this.ratingChange}>
                                    <option value="G">G</option>
                                    <option value="Y">Y</option>
                                    <option value="PG">PG</option>
                                    <option value="PG-13">PG-13</option>
                                    <option value="R">R</option>
                                </select>
                            </div>
                            <div className="col-md-3 mb-3">
                                <label>Limit</label>
                                <input type="text" className="form-control" id="zip" placeholder="25" value={this.state.limit} onChange={this.limitChange} />
                            </div>
                        </div>
                        <div className="mb-3">
                                <button  className="btn btn-primary btn-lg btn-block" type="button" onClick={this.searchForm}> Gif Ara </button>
                        </div>
                        
                    </div>
                </div>
                <SearchList myApiURL={createAPIURL} isSearch={isSearch} searchData={setJsonData} pageTitle= {pageTitle} />
            </div>
        )
    }
}

export default SearchForm;