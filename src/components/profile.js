import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    name: PropTypes.string,
    content:PropTypes.string,
    date:PropTypes.string
};

const Profile = ({name,content,date}) => {
     var cdate = (new Date(date)).toString();
    return (
        <div>
         <div className="container">
        <h3 style={{textAlign:'left'}}>{name}</h3>   
        <blockquote className="blockquote">
            <p className="mb-0">{content}</p>
            <footer className="blockquote-footer"> <i>{cdate}</i> </footer>
        </blockquote>
    </div>
        </div>
    );
};

Profile.propTypes = propTypes;
export default Profile;