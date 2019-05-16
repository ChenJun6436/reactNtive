function withErrorBoundary(
    WrappedComponent: React.ComponentType <CatchCompProps> ,
    errorCallback: Function,
    allowedInDevMode: boolean,
    opt: Object = {}) {
    return class extends React.Component <CatchCompProps, CatchCompState> {
        state = {
            error: null,
            errorInfo: false,
            visible: false,
        }
        componentDidCatch(error: Error, errorInfo: any) {
            this.setState({
                error,
                errorInfo,
                visible: true,
            })
            errorCallback && errorCallback(error, errorInfo)
        }
        handleLeft = () => {
            ...
        }
        render() {
            const { title = 'Unexpected error occurred', message = 'Unexpected error occurred' } = opt
            return (
                this.state.visible && (allowedInDevMode ? true : process.env.NODE_ENV !== 'development') ? (
                <Modal 
                    visible
                    transparent
                    animationType={'fade'}>
                    <View style={styles.container}>
                        <View style={styles.header}>
                        <NavBar
                            title={title}
                            leftIcon={'arrow-left'}
                            handleLeft={this.handleLeft}/>
                        </View>
                        <View style={styles.info}>
                            <Text>{message}</Text>
                        </View> 
                        <ScrollView style={styles.content}>
                            <Text> { this.state.error && this.state.error.toString()} </Text>
                            <Text> { this.state.errorInfo && this.state.errorInfo.componentStack } </Text> 
                        </ScrollView>
                    </View>
                </Modal>
                ) : <WrappedComponent {...this.props} />
            );
        }
    }
}

export default withErrorBoundary;