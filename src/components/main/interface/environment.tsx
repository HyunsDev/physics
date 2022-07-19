import { useState, useContext } from "react";
import { Controller, CheckBox, Inputs, NumberField, Divver, InputButton } from "../..";
import { useEnvironment } from "../../../hook/useEnvironment";
import { useWorker } from "../../../hook/useWorker";

export function EnvironmentController() {
    const env = useEnvironment()
    const [ showOption, setShowOption ] = useState(false)

    return (
        <Controller right={20} bottom={20} minWidth={150}>
            <Inputs>
                { showOption && <>
                    <NumberField 
                        label="중력 가속도" 
                        value={env.data.gravity} 
                        onChange={value => {env.updateData('gravity', value)}} 
                        min={-100} 
                        max={100} 
                        step={1} 
                    />

                    <NumberField 
                        label="마찰계수" 
                        value={env.data.friction} 
                        onChange={value => {env.updateData('friction', value)}} 
                        min={0} 
                        max={1} 
                        step={0.01} 
                    />

                    {/* <NumberField 
                        label="공기저항" 
                        value={env.data.windDrag} 
                        onChange={value => {env.updateData('windDrag', value)}} 
                        min={0} 
                        max={1000} 
                        step={1} 
                    /> */}

                    <NumberField 
                        label="바람 X" 
                        value={env.data.windX} 
                        onChange={value => {env.updateData('windX', value)}} 
                        min={-100} 
                        max={100} 
                        step={0.01} 
                    />

                    <NumberField 
                        label="바람 Y" 
                        value={env.data.windY} 
                        onChange={value => {env.updateData('windY', value)}} 
                        min={-100} 
                        max={100} 
                        step={0.01} 
                    />
                    
                    <Divver />
                </> }

                <CheckBox label="환경 설정" value={showOption} onClick={() => {setShowOption(!showOption)}} />
            </Inputs>
        </Controller>
    )
}
