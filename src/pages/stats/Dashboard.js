import { Title1 } from "@fluentui/react-components";
import { Link } from "react-router-dom";

function Dashboard({ data }) {
    let saphphire_user = 'lazy123';

    return (
        /*
Total number of streams by their start time (rounded to the nearest hour) (table-metric, dashboard)
How many viewers does the lowest viewer count stream that the logged in user is following need to gain in order to make it into the top 1000? (metric, dashboard)
Median number of viewers for all streams (metric, dashboard)

        */
        <div>
            <div class="flex flex-wrap -mx-3 mb-3">
                <div class="px-3 mb-6 w-1/2">
                    <div class="card relative px-6 py-4 card-panel">
                        <div class="flex mb-4">
                            <h3 class="mr-3 text-base text-80 font-bold">
                                Sapphire Index
                            </h3>
                        </div>
                        <p class="flex items-center text-4xl mb-4">
                            <Title1>{data.aggregates.lowest_following_diff_top_1000 ? data.aggregates.lowest_following_diff_top_1000 : 0}</Title1>
                        </p>
                        <div>
                            <p class="flex items-center text-80 font-bold">
                                <span>
                                    <span>
                                        Number of viewers <a href={'https://twitch.tv/' + saphphire_user} target="_blank">{saphphire_user}</a> needs to make it to top 1000
                                    </span>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="px-3 mb-6 w-1/2">
                    <div class="card relative px-6 py-4 card-panel">
                        <h3 class="flex mb-3 text-base text-80 font-bold">
                            User Status

                            <span class="ml-auto font-semibold text-70 text-sm">
                                (5,736 total)
                            </span>
                        </h3>
                        <div class="min-h-90px">
                            <div class="overflow-hidden overflow-y-auto max-h-90px">
                            </div>
                            <div class="vertical-center rounded-b-lg ct-chart mr-4">
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div class="px-3 mb-6 w-1/2">
                    <div class="card relative px-6 py-4 card-panel">
                        <div class="flex mb-4">
                            <h3 class="mr-3 text-base text-80 font-bold">Transaction Count</h3>
                        </div>
                        <p class="flex items-center text-4xl mb-4">
                            0
                        </p>
                        <div>
                            <p class="flex items-center text-80 font-bold">
                                <span>
                                    <span>
                                        No Data
                                    </span>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="px-3 mb-6 w-1/2">
                    <div class="card relative px-6 py-4 card-panel">
                        <div class="flex mb-4">
                            <h3 class="mr-3 text-base text-80 font-bold">Transaction Total Value</h3>
                        </div>
                        <p class="flex items-center text-4xl mb-4">
                            0
                        </p>
                        <div>
                            <p class="flex items-center text-80 font-bold">
                                <span>
                                    <span>
                                        No Data
                                    </span>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;