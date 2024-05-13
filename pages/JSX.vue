<script lang="tsx">
import { Button } from "~/components/ui/button";
import { usePiniaStore2 } from "~/stores/usePinia";



interface Props {
    message: string;
    count?: number;
}
export default ({
    // props: {
    //     message: {
    //         type: String,
    //         default: "Hello, World!",
    //     },
    // },
    emits: ["update-message"],
    setup({ message, count }: Props, { emit }) {
        // console.log(props);
        const piniaStore = usePiniaStore2();
        return {
            // props
            message: message,
            emit,
            piniaStore
        };
    },
    render() {
        // console.log(this);

        return (
            <div class='flex '>
                <div>
                    {this.message}
                </div>
                <button
                    onClick={(e) => {
                        this.emit("update-message", "123");
                    }}
                >
                    update-message
                </button>
                {this.piniaStore.text}
                <button onClick={() => this.piniaStore.increment('+')}>
                    increment pinia
                </button>
            </div>
        );
    },
});
</script>
