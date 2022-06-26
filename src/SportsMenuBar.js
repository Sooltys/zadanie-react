import React from 'react';
import ReactDOM from 'react-dom/client';
import './SportsMenuBar.css';

function CompetitionCategory(props) {
    return;
}

class NationCategory extends React.Component {
    render(props) {
        return(
            <div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.props.categoryId}.&nbsp;
                {this.props.categoryName}-
                {this.props.parentCategory}
            </div>
        );
    }
}

class SportsCategory extends React.Component {
    render(props) {
        //this.props.forEach()
        let nations = [];
        if(this.props.whichCategory === this.props.categoryId) {
            nations = this.props.nations
        }
        return (
            <div>
                <img src='./logo192.png' width='18px' alt='logo sportu' />&nbsp;
                <button onClick={this.props.onClick}>{this.props.categoryId}.&nbsp;
                <b>{this.props.categoryName}</b>
                <span className='eventsCount'>({this.props.eventsCount})</span></button>
                {nations}
            </div>
        );
    }
}

class SportsMenuBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            openSport: 0
        }
    }

    componentDidMount() {
        fetch("/rest/market/categories")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json.data
                })
            })
    }

    handleClick(i) {
        if(this.state.openSport !== i) {
            this.setState( {openSport:i} )
        } else if(this.state.openSport === i ) {
            this.setState( {openSport:0} )
        }
        
        console.log(i + ' - ' + this.state.openSport);
    }

    render(props) {
        let sportsRow = [];
        let nationRow = [];
        let competitionRow = [];
        this.state.items.forEach((element, key) => {
            if(element.level === 1) {
                let nations = this.state.items.map((item, key) => {
                    if(item.parentCategory === element.categoryId) {
                        return <NationCategory
                        key={key}
                        categoryName={item.categoryName}
                        categoryId={item.categoryId} 
                        eventsCount={item.eventsCount}
                        parentCategory={item.parentCategory} />;
                    }
                });
                sportsRow.push(
                    <SportsCategory
                        key={key}
                        categoryName={element.categoryName}
                        categoryId={element.categoryId}  
                        eventsCount={element.eventsCount} 
                        nations={nations} 
                        onClick={() => this.handleClick(element.categoryId)} 
                        whichCategory={this.state.openSport} />
                );
            } else if(element.level === 2) {
                //nationRow.push(element);
                nationRow.push(
                    <NationCategory
                        categoryName={element.categoryName}
                        categoryId={element.categoryId} 
                        eventsCount={element.eventsCount}
                        parentCategory={element.parentCategory} />
                );
            } else {
                competitionRow.push(element);
                // competitionRow.push(
                //     <SportsCategory
                //         categoryName={element.categoryName}
                //         categoryId={element.categoryId}/>
                // );
            }
        })
        
        return (
            <div className='menuBar'>
                {sportsRow}
                {/* {nationRow} */}
            </div>
        );
    }
}


export default SportsMenuBar;