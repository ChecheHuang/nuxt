<script lang="tsx">
import { Button } from "~/components/ui/button";
import { usePiniaStore2 } from "~/stores/usePinia";



interface Props {
    message: string;
    count?: number;
}
export default ({
    emits: ["update-message"],
    setup({ message, count }: Props, { emit }) {
        // console.log(props);
        const piniaStore = usePiniaStore2();
        return () => (
            <div class='flex '>
                <div>
                    {message}
                </div>
                <Button
                    onClick={(e) => {
                        emit("update-message", "123");
                    }}
                >
                    update-message
                </Button>
                {piniaStore.text}
                <Button onClick={() => piniaStore.increment('+')}>
                    increment pinia
                </Button>
            </div>)
    },
});
</script>
