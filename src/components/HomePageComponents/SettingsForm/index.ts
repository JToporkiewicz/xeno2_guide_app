import { connect } from 'react-redux';
import actions from './actions';
import selector from './selector';
import { SettingsFormView } from './SettingsForm';

export const SettingsForm = connect(selector, actions)(SettingsFormView)