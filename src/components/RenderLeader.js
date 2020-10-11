import React from 'react';
import {Media} from 'reactstrap';

const Renderleader = (props) => {
    return(
        <Media className="m-2 mb-4">
            <Media left>
                <Media object src="/assets/images/alberto.png" alt="Leader Image" />
                </Media>
                <Media body className="ml-5">
                    <Media heading>{props.leader.name}</Media>
                    <p>{props.leader.designation}</p>
                    <p>{props.leader.description}</p>
                </Media>
        </Media>
    );
}

export default Renderleader;