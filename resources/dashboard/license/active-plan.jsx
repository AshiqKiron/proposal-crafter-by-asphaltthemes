import { FaRegCalendarAlt } from 'react-icons/fa';
import {
	ActivePlanWrapper,
	ActivePlanSubtitle,
	ActivePlanName,
	ActivePlanDescription,
} from './style';

export default function ActivePlan() {
	return (
		<ActivePlanWrapper>
			<ActivePlanSubtitle>🚀 Current Plan</ActivePlanSubtitle>
			<ActivePlanName>Free</ActivePlanName>
			<ActivePlanDescription>
				<FaRegCalendarAlt />
				Always free
			</ActivePlanDescription>
		</ActivePlanWrapper>
	);
}
