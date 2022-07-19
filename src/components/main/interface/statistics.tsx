import { Controller, Label, Labels } from "../..";
import { useData } from "../../../hook/useData";
import { useSetting } from "../../../hook/useSetting";

interface StatisticsProps {
    fps_ups: string
}

export function Statistics(props: StatisticsProps) {
    const setting = useSetting()
    const data = useData()

    return (
        <Controller right={20} top={20} minWidth={200}>
            <Labels>
                <Label name={'현재 물체 수'} value={Object.keys(data.planets || {}).length}/>
                { setting.setting.drawerIsShowFPS_UPS && <>
                    <Label name={'FPS / UPS'} value={props.fps_ups}/>
                    <Label name={'루프 수'} value={data.loopId}/>
                </> }
            </Labels>
        </Controller>
    )
}
