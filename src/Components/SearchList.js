import React, { Component } from 'react'

class SearchList extends Component {

    constructor(props){
        super(props);
    };
    render() {
        const {searchData} = this.props;
        return (
            <div className="searchList row">
            <div className="col-12">
                <h2>{this.props.pageTitle}</h2>
                <hr />
            </div>
            {
                searchData.map((item, index) => {
                   return (
                        <div className="col-md-4" key={index}>
                            <div className="card mb-4 shadow-sm">
                                <img src={item.images.fixed_height.url} />
                                <div className="card-body">
                                    <p className="card-text">
                                        {item.title}<br />
                                        <span className="type">{item.type}</span><a href={item.bitly_url} target="_blank" className="float-right btnView">Giphy'de Gör</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                   )
                })
            }
            </div>
        )
    }
}

export default SearchList;