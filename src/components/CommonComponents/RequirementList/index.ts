import { connect } from 'react-redux';
import selector from './selector';
import { RequirementListComponent } from './RequirementList';

export const RequirementList = connect(selector)(RequirementListComponent)