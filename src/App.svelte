<script>
	import format from 'date-fns/format';
	import setDay from 'date-fns/setDay';
	import getDay from 'date-fns/getDay';
	import lastDayOfMonth from 'date-fns/lastDayOfMonth';
	import isSameDay from 'date-fns/isSameDay'
	import isAfter from 'date-fns/isAfter';
	import isBefore from 'date-fns/isBefore';
	import addDays from 'date-fns/addDays';
	import getMonth from 'date-fns/getMonth';
	import getWeek from 'date-fns/getWeek';
	import setWeek from 'date-fns/setWeek';

	const year = 2020;
	const month = 2; // 0-based
	const firstMonthDate = new Date(year, month, 1);
	const lastMonthDate = lastDayOfMonth(firstMonthDate);
	const weekOptions = { weekStartsOn: 1 };

	const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
	const weeks = [];

	let firstCalendarDate = setDay(firstMonthDate, 1);
	const lastCalendarDate = setDay(lastMonthDate, 7);

	if (isAfter(firstCalendarDate, firstMonthDate)) {
		firstCalendarDate = setWeek(firstCalendarDate, getWeek(firstCalendarDate, weekOptions) - 1, weekOptions);
	}

	let currentDate = firstCalendarDate;
	while (isBefore(currentDate, lastCalendarDate) || isSameDay(currentDate, lastCalendarDate)) {
		let week;

		if (getDay(currentDate) === 1) {
			week = [];
			weeks.push(week);
		} else {
		 week = weeks[weeks.length - 1];
		}

		week.push({
			isActiveMonth: (getMonth(currentDate) === getMonth(firstMonthDate)),
			number: format(currentDate, 'd')
		});

		currentDate = addDays(currentDate, 1);
	}
</script>

<main>
	<table>
		<thead>
			{#each days as day}
				<th>{day}</th>
			{/each}
		</thead>
		<tbody>
			{#each weeks as week}
				<tr>
					{#each week as day}
						<td
							class:active-month={day.isActiveMonth}
						>{day.number}</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
	<div class="month">{format(firstMonthDate, 'MMMM yyyy')}</div>
</main>

<style>
	main {
		display: flex;
		align-items: center;
		color: #555;
	}

	.month {
		writing-mode: vertical-rl;
		font-size: 5vh;
		font-weight: bold;
		margin-top: calc(100vh / 8);
		margin-left: 1vh;
	}

	table {
		border-collapse: collapse;
	}

	th {
		vertical-align: bottom;
		padding-bottom: 1vh;
		font-size: 4vh;
	}

	th, td {
		width: calc(100vh / 8);
		height: calc(100vh / 8);
	}

	td {
		border: 0.45vh solid #555;
		text-align: center;
		font-size: 2vh;
		opacity: 0.5;
	}

	td.active-month {
		opacity: 1;
	}
</style>
